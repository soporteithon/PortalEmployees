export const CustomFullScreenLoading = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-5">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-3 border-border" />
                    <div className="absolute inset-0 animate-spin rounded-full border-3 border-transparent border-t-primary" />
                </div>
                <p className="text-sm text-muted-foreground tracking-wide">
                    Cargando...
                </p>
            </div>
        </div>
    );
};