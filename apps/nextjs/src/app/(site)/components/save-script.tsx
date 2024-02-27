"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@voiceai/ui/@/components/ui/dialog";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { HeartIcon } from "@voiceai/ui/@/icons/icons";

import { api } from "~/utils/api";

interface SaveScriptProps {
  script: string;
}
export function SaveScript({ script = "" }: SaveScriptProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const { scriptId } = useParams();

  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  React.useEffect(() => {
    if (scriptDetails) {
      setName(scriptDetails.name);
    }
  }, [scriptDetails]);

  const { mutateAsync: createScript, error: errorCreatingScript } =
    api.script.create.useMutation({
      onSuccess(data) {
        setLoading(false);
        setOpen(false);
        router.push(`/texttospeech/${data?.id}`, { scroll: false });
      },
      onError(error) {
        setLoading(false);

        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      },
    });

  const { mutateAsync: updateScript, error: errorUpdatingScript } =
    api.script.update.useMutation({
      onSuccess(data) {
        setLoading(false);
        toast({
          title: "Script updated",
          description: "Your script has been updated",
        });
        setOpen(false);
      },
      onError(error) {
        setLoading(false);

        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      },
    });
  return (
    <div className="mt-0.5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-xl  bg-sky-400 px-3 font-bold text-primary-foreground hover:bg-blue-600 hover:text-secondary-foreground"
          >
            <HeartIcon className="mr-2 h-4 w-4 " />
            <h3>Save</h3>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>
              {scriptDetails ? "Update" : "Save"} script
            </DialogTitle>
            <DialogDescription>
              {scriptDetails
                ? `This will update the current script.`
                : `This will save the current console state as a preset which you can access later.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" id="name">
                Name
              </Label>
              <Input
                id="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div> */}
          </div>
          <DialogFooter>
            <Button
              disabled={name.length === 0}
              onClick={async () => {
                setLoading(true);
                try {
                  console.log("creating", name, script);
                  scriptDetails
                    ? await updateScript({
                        id: scriptDetails.id,
                        name: name,
                        script: script,
                      })
                    : await createScript({
                        name: name,
                        script: script.length > 1 ? script : undefined,
                      });
                  setLoading(false);
                } catch {}
              }}
            >
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>{scriptDetails ? "Update" : "Create"}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
