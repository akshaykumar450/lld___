public class SingleRoom implements Room  {
    public Money price() {
        return new Money(14000.0);
    }
    public String name() {
        return "SINGLE";
    }
}
