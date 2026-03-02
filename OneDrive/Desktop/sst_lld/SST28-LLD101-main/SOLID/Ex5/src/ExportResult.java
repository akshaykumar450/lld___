public class ExportResult {
    public final boolean success;
    public final String contentType;
    public final byte[] bytes;
    public final String message;

    private ExportResult(boolean success, String contentType, byte[] bytes, String message) {
        this.success = success;
        this.contentType = contentType;
        this.bytes = bytes;
        this.message = message;
    }

    public static ExportResult ok(String contentType, byte[] bytes) {
        return new ExportResult(true, contentType, bytes, null);
    }

    public static ExportResult error(String message) {
        return new ExportResult(false, null, new byte[0], message);
    }
}