public class CreditsRule implements Rules {
    public boolean isEligible(StudentProfile s) {
        return s.getEarnedCredits() >= RuleInput.minCredits;
    }
    
    public String reason() {
        return "credits below 20";
    }
}
