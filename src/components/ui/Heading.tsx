export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-center text-xl font-semibold relative after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[1px] after:bg-gray-200">
      <span className="relative z-1 bg-white px-2">{children}</span>
    </h2>
  );
};
