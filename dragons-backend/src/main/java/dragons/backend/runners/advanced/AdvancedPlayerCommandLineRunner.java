package dragons.backend.runners.advanced;

import dragons.backend.external.ExternalApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test & !default & advanced")
@Component
public class AdvancedPlayerCommandLineRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AdvancedPlayerCommandLineRunner.class);

  private final ExternalApi api;

  public AdvancedPlayerCommandLineRunner(ExternalApi api) {
    this.api = api;
  }

  @Override
  public void run(String... args) throws Exception {
    logger.info("### running AdvancedPlayerCommandLineRunner");
    
    Context context = new Context(api);
    
    Action start = new StartGameAction(context);
    Action next = start.exec();
    
    while ((next = next.exec()) != null) {
//      logger.warn("{}", next.getClass().getSimpleName());
    }
   
    logger.info("### game over ###");
  }
}
