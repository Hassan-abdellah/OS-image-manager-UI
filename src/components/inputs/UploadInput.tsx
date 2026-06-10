import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

const UploadInput = ({
  ref,
}: {
  ref: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <Field>
      <FieldLabel htmlFor="picture" className="input-label">
        Pictures
      </FieldLabel>
      <Input
        id="picture"
        type="file"
        className="input-field cursor-pointer"
        multiple
        accept=".jpg,.jpeg,.png"
        ref={ref}
      />
      <FieldDescription>Select max of 10 pictures To Upload.</FieldDescription>
    </Field>
  );
};

export default UploadInput;
