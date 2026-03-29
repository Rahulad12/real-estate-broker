import { FieldLabel } from "../field";

const Label = ({ children }: { children: React.ReactNode }) => (
  <FieldLabel className="block text-[11px] font-medium tracking-[0.14em] uppercase text-secondary-foreground mb-2">
    {children}
  </FieldLabel>
);

export default Label;