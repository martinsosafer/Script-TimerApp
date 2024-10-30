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
import { EditIcon, Icons, PencilIcon } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { HeartIcon } from "@voiceai/ui/@/icons/icons";

import { api } from "~/utils/api";

interface SaveScriptProps {
  script: string;
  subData: string | undefined;
  richContent: string;
}
export function SaveScript({
  script = "",
  richContent = "",
  subData,
}: SaveScriptProps) {
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
      // Truncate the name if it exceeds the character limit
      const truncatedName = scriptDetails.name.slice(0, 20);
      setName(truncatedName);
    }
  }, [scriptDetails]);

  const { mutateAsync: createScript, error: errorCreatingScript } =
    api.script.create.useMutation({
      onSuccess(data) {
        setName(name);
        setLoading(false);
        setOpen(false);

        router.push(`/texttovoice/${data?.id}`, { scroll: false });
      },
      onError(error) {
        setLoading(false);

        toast({
          title: "Something went wrong",
          description: "Please verify you have a script or try again later",
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
      <Dialog open={open} onOpenChange={subData ? setOpen : undefined}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-xl  bg-sky-400 px-3 font-bold text-primary-foreground hover:bg-blue-600 hover:text-secondary-foreground"
          >
            {scriptDetails ? (
              <EditIcon className="mr-2 h-4 w-4" />
            ) : (
              <HeartIcon className="mr-2 h-4 w-4" />
            )}
            <h3>{scriptDetails ? "Save" : "Save"}</h3>
          </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-primary sm:max-w-[475px] ">
          <DialogHeader className="flex items-center  text-xl  font-semibold ">
            <DialogTitle className="flex items-center space-x-2 text-primary">
              <PencilIcon className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">
                {scriptDetails ? "Save" : "Save"} script
              </span>
            </DialogTitle>
            {/* <DialogDescription>
              {scriptDetails
                ? `This will update the current script.`
                : `This will save the current console state as a preset which you can access later.`}
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                id="name"
                className="text-lg font-medium text-black"
              >
                {scriptDetails ? "Edit your title" : "Enter your title"}
              </Label>
              <Input
                id="Enter your title"
                autoFocus
                value={name}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
                className="border border-black "
              />
            </div>
            {/* <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div> */}
          </div>
          <DialogFooter className="flex justify-center">
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary font-poppins font-semibold text-primary"
                onClick={() => setOpen(false)} // Close the dialog when Cancel is clicked
              >
                Cancel
              </Button>
              <Button
                className="border-2 border-primary font-poppins font-semibold text-primary-foreground"
                size="lg"
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
                          richText: richContent,
                        })
                      : await createScript({
                          name: name,
                          script: script.length > 1 ? script : undefined,
                          richText:
                            richContent.length > 1 ? richContent : undefined,
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
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* {scriptDetails && <DeleteButton />} */}
    </div>
  );
}
