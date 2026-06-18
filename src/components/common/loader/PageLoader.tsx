interface PageLoaderProps {
  loading: boolean;
}

const PageLoader = ({ loading }: PageLoaderProps) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
    </div>
  );
};

export default PageLoader;