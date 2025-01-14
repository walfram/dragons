package dragons.backend.external.config;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

public class LoggingInterceptor implements ClientHttpRequestInterceptor {

  private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);

  @Override
  public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
    // logger.debug(">>> request headers = {}", request.getHeaders());

    ClientHttpResponse execute = execution.execute(request, body);

    HttpStatusCode statusCode = execute.getStatusCode();
    if (!statusCode.is2xxSuccessful()) {
      logger.info(">>> response status code = {}", statusCode.value());
    }

    // logger.debug("<<< response headers = {}", execute.getHeaders());

    return execute;
  }
}
