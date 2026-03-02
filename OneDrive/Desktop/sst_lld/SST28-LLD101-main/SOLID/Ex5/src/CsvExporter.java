import java.nio.charset.StandardCharsets;

public class CsvExporter extends Exporter {
    @Override
    public ExportResult export(ExportRequest req) {
        requireRequest(req);
        String csv = escape(req.title) + "," +
                     escape(req.body) + "\n";

        return ExportResult.ok("text/csv",csv.getBytes(StandardCharsets.UTF_8)
        );
    }

    private String escape(String s) {
        if (s.contains(",") || s.contains("\n") || s.contains("\"")) {
            s = s.replace("\"", "\"\"");
            return "\"" + s + "\"";
        }
        return s;
    }
}