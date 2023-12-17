"use client";

import * as React from "react";

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

import { api } from "~/utils/api";

export function ScriptsEmptyPlaceholder() {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const { mutateAsync: createScript, error: errorCreatingScript } =
    api.script.create.useMutation({
      onSuccess(data) {
        console.log("DONE CREATING SCRIPT", data);
        setLoading(false);
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
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-10 w-10 text-muted-foreground"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="11" r="1" />
          <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
          <path d="M17 18.5a9 9 0 1 0-10 0" />
        </svg>

        <h3 className="mt-4 text-lg font-semibold">No scripts created</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any scripts. Add one below.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Add Script
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Script</DialogTitle>
              <DialogDescription>
                Create a script. Give it a good name, that way its yours.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Script Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Script"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={name.length === 0}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await createScript({
                      name: name,
                    });
                    setLoading(false);
                  } catch {}
                }}
              >
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
