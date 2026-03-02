import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Hostel Fee Calculator ===");
        BookingRequest req = new BookingRequest(new DoubleRoom(), List.of(new Laundary(), new Mess()));
        HostelFeeCalculator calc = new HostelFeeCalculator(new FakeBookingRepo());
        calc.process(req);
    }
}
