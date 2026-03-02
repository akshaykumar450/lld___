public class DoubleRoom implements Room {
    public Money price() {
        return new Money(15000.0);
    }
    public String name() {
        return "DOUBLE";
    }
}
