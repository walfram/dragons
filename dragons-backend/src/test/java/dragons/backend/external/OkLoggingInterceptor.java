package dragons.backend.external;

import java.io.IOException;
import okhttp3.Headers;
import okhttp3.Request;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OkLoggingInterceptor implements okhttp3.Interceptor {

  private static final Logger logger = LoggerFactory.getLogger(OkLoggingInterceptor.class);
  
  @NotNull
  @Override
  public Response intercept(@NotNull Chain chain) throws IOException {
    Request request = chain.request();
    
    Headers requestHeaders = request.headers();
    logger.debug("request headers = {}", requestHeaders);

    Response response = chain.proceed(request);

    Headers responseHeaders = response.headers();
    logger.debug("response headers = {}", responseHeaders);

    return response;
  }
}
