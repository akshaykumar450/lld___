import java.util.ArrayList;
import java.util.List;

public class ReceiptPrinter {
    public static void print(BookingRequest req, Money monthly, Money deposit) {

        List<String> addOns = new ArrayList<>();
        for(AddOn a : req.addOns) {
            addOns.add(a.name());
        }

        System.out.println("Room: " + req.room.name() + " | AddOns: " + addOns);
        System.out.println("Monthly: " + monthly);
        System.out.println("Deposit: " + deposit);
        System.out.println("TOTAL DUE NOW: " + monthly.plus(deposit));
    }
}
