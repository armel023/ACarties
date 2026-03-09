type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={`${center ? "text-center" : ""}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && (
        <p className="font-light text-neutral-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
