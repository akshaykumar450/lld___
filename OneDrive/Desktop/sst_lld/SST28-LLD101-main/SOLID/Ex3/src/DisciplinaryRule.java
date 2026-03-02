public class DisciplinaryRule implements Rules {
    public boolean isEligible(StudentProfile s) {
        return s.getDisciplinaryFlag() == LegacyFlags.NONE;
    }
    
    public String reason() {
        return "disciplinary flag present";
    }
}
