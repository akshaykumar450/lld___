public class Main {
    public static void main(String[] args) {
        System.out.println("=== Evaluation Pipeline ===");
        Submission sub = new Submission("23BCS1007", "public class A{}", "A.java");
        Rubric rubric = new Rubric();
        PlagiarismChecker pc = new PlagiarismChecker();
        CodeGrader grader = new CodeGrader();
        ReportWriter writer = new ReportWriter();

        EvaluationPipeline pipeline = new EvaluationPipeline(rubric, pc, grader, writer);
        pipeline.evaluate(sub);
    }
}
