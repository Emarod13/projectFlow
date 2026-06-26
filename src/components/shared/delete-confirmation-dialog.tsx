"use client";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type Props = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
};

export function DeleteConfirmationDialog({
  trigger,
  title,
  description,
  onConfirm,
}: Props) {
  const [loading, setLoading] =useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

            <AlertDialogAction

                disabled={loading}

                onClick={async () => {

                    setLoading(true);

                    await onConfirm();

                    setLoading(false);

                }}

            >
                {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}