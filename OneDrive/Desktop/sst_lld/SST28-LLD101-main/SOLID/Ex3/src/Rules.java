interface Rules {
    boolean isEligible(StudentProfile s);
    String reason();
}