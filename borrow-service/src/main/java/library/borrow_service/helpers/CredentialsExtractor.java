package library.borrow_service.helpers;

public class CredentialsExtractor {
    public static int getUserId(String credentials) {
        String[] parts = credentials.split(",");
        String userRole = null;
        String userId = null;
        for (String part : parts) {
            String[] keyValue = part.split("=");
            if (keyValue.length == 2) {
                if (keyValue[0].trim().equalsIgnoreCase("userRole")) {
                    userRole = keyValue[1].trim();
                } else if (keyValue[0].trim().equalsIgnoreCase("userId")) {
                    userId = keyValue[1].trim();
                }
            }
        }
        return Integer.parseInt(userId);
    }
}
