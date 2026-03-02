import java.util.*;

public class BookingRequest {
    public final Room room;
    public final List<AddOn> addOns;

    public BookingRequest(Room room, List<AddOn> addOns) {
        this.room = room;
        this.addOns = addOns;
    }
}
