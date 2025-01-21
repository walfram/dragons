package dragons.backend.runners.advanced;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameOverAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(GameOverAction.class);
  
  private final Context context;

  public GameOverAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    logger.debug("game over, context = {}", context);
    return null;
  }
}
