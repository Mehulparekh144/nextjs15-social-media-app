import React, { useState } from "react";
import { Input, InputProps } from "./ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props },
  ref) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return <div className="relative">
      <Input type={showPass ? "text" : "password"} className={cn("pe-10" , className)} ref={ref} {...props} />
      <button type="button" 
      onClick={() => setShowPass(!showPass)} 
      title={showPass ? "Hide password" : "Show password"}
      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      >
          {
            showPass ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )
          }

      </button>
    </div>;
  });

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
