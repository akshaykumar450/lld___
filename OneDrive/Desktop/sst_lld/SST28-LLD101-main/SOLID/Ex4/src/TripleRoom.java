public class TripleRoom implements Room {
    public Money price() {
        return new Money(12000.0);
    }
    public String name() {
        return "TRIPLE";
    }

}
