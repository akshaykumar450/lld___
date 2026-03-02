public class CgrRule implements Rules {
    
    public boolean isEligible(StudentProfile s) {
        return s.getCgr() >= RuleInput.minCgr;
    }
    public String reason() {
        return "CGR below 8.0";
    
    }
}
