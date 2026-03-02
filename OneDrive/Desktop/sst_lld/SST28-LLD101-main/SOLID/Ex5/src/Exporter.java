public abstract class Exporter {
    
    protected final void requireRequest(ExportRequest req) {
        if (req == null) throw new IllegalArgumentException("ExportRequest cannot be null");
    }

    public abstract ExportResult export(ExportRequest req);
}
