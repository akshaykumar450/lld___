import java.nio.charset.StandardCharsets;

public class PdfExporter extends Exporter {
    @Override
    public ExportResult export(ExportRequest req) {
        // LSP violation: tightens precondition arbitrarily
        requireRequest(req);
        if (req.body.length() > 20) {
            return ExportResult.error("PDF cannot handle content > 20 chars");
        }

        String fakePdf = "PDF(" + req.title + "):" + req.body;

        return ExportResult.ok(
                "application/pdf",
                fakePdf.getBytes(StandardCharsets.UTF_8)
        );
    }
}
