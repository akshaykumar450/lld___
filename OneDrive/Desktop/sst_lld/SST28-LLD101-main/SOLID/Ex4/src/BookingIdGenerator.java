import java.util.Random;

public class BookingIdGenerator {
    public static String generate() {
        return "H-" + (7000 + new Random(1).nextInt(1000));
    }
}
