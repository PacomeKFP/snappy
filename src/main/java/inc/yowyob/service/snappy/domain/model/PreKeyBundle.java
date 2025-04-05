package inc.yowyob.service.snappy.domain.model;

import lombok.Data;

@Data
public class PreKeyBundle {
  private byte[] identityKey;
  private long registrationId;
  private PreKey preKey;
  private SignedPreKey signedPreKey;

  @Data
  public static class PreKey {
    private long keyId;
    private byte[] publicKey;
  }

  @Data
  public static class SignedPreKey {
    private long keyId;
    private byte[] publicKey;
    private byte[] signature;
  }
}
