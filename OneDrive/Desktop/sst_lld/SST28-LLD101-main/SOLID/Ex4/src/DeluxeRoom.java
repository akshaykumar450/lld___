public class DeluxeRoom implements Room {
    public Money price() {
        return new Money(16000.0);
    }
    public String name() {
        return "DELUXE";
    }
}
