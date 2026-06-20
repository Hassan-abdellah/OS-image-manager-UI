import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { modifiedFileType } from "@/types";
import { useEffect, useRef } from "react";

const UploadInput = ({
  files,
  handleSelectFiles,
}: {
  files: modifiedFileType[];
  handleSelectFiles: (files: File[] | []) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Call this wherever you clear files
  const clearFiles = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (!files.length) clearFiles();
  }, [files.length]);

  return (
    <Field>
      <FieldLabel htmlFor="picture" className="input-label">
        Pictures
      </FieldLabel>
      <Input
        id="picture"
        type="file"
        ref={inputRef}
        onChange={(e) => handleSelectFiles(Array.from(e.target.files ?? []))}
        className="input-field cursor-pointer"
        multiple
        accept=".jpg,.jpeg,.png"
      />
      <FieldDescription>Select max of 10 pictures To Upload.</FieldDescription>
    </Field>
  );
};

export default UploadInput;
