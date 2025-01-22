package dragons.backend.runners;

import dragons.backend.external.ExternalApi;
import dragons.backend.game.actions.Action;
import dragons.backend.game.Context;
import dragons.backend.game.actions.StartGameAction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class AIPlayerCommandLineRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AIPlayerCommandLineRunner.class);

  private final ExternalApi api;

  public AIPlayerCommandLineRunner(ExternalApi api) {
    this.api = api;
  }

  @Override
  public void run(String... args) throws Exception {
    logger.info("### running AIPlayerCommandLineRunner");
    
    Context context = new Context(api);
    
    Action start = new StartGameAction(context);
    Action next = start.exec();
    
    while ((next = next.exec()) != null) {
//      logger.warn("{}", next.getClass().getSimpleName());
    }
   
    logger.info("### game over ###");
  }
}
