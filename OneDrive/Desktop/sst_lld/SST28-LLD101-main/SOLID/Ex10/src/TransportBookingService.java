public class TransportBookingService {
    // DIP violation: direct concretes
    DistanceCalculator dist ;
    DriverAllocator alloc ;
    PaymentGateway pay ;
    public TransportBookingService(DistanceCalculator dist , DriverAllocator alloc , PaymentGateway pay) {
        this.alloc = alloc;
        this.dist = dist;
        this.pay = pay;
    }
    public void book(TripRequest req) {
        

        double km = dist.km(req.from, req.to);
        System.out.println("DistanceKm=" + km);

        String driver = alloc.allocate(req.studentId);
        System.out.println("Driver=" + driver);

        double fare = FarePolicy.calculateFare(km); // messy pricing

        String txn = pay.charge(req.studentId, fare);
        System.out.println("Payment=PAID txn=" + txn);

        BookingReceipt r = new BookingReceipt("R-501", fare);
        System.out.println("RECEIPT: " + r.id + " | fare=" + String.format("%.2f", r.fare));
    }
}
