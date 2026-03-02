public class HostelFeeCalculator {
    private final BookingRepo repo;

    public HostelFeeCalculator(BookingRepo repo) { 
        this.repo = repo; 
    }

    // OCP violation: switch + add-on branching + printing + persistence.
    public void process(BookingRequest req) {
        Money monthly = calculateMonthly(req);
        Money deposit = calculateDeposit();

        ReceiptPrinter.print(req, monthly, deposit);

        String bookingId = BookingIdGenerator.generate(); // deterministic-ish
        repo.save(bookingId, req, monthly, deposit);
    }

    private Money calculateMonthly(BookingRequest req) {
        Money base;
        base = req.room.price();

        double add = 0.0;
        for (AddOn a : req.addOns) {
            add += a.price();
        }
        Money p = new Money(add).plus(base);
        return p;
    }
    private Money calculateDeposit() {
        return new Money(5000.0);
    }
}
