public interface BookingRepo {
    void save(String bookingId, BookingRequest req, Money monthly, Money deposit);
}
