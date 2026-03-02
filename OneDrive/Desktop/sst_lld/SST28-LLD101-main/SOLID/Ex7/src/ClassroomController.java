public class ClassroomController {
    private final DeviceRegistry reg;

    public ClassroomController(DeviceRegistry reg) { this.reg = reg; }

    public void startClass() {
        Projector pj = reg.getFirstOfType(Projector.class);
        pj.powerOn();
        pj.connectInput("HDMI-1");

        LightsPanel lights = reg.getFirstOfType(LightsPanel.class);
        lights.setBrightness(60);

        AirConditioner ac = reg.getFirstOfType(AirConditioner.class);
        ac.setTemperatureC(24);

        AttendanceScanner scan = reg.getFirstOfType(AttendanceScanner.class);
        System.out.println("Attendance scanned: present=" + scan.scanAttendance());
    }

    public void endClass() {
        System.out.println("Shutdown sequence:");
        reg.getFirstOfType(Projector.class).powerOff();
        reg.getFirstOfType(LightsPanel.class).powerOff();
        reg.getFirstOfType(AirConditioner.class).powerOff();
    }
}
