package dragons.backend.game.actions;

import dragons.backend.game.responses.PlayerReputationResponse;
import dragons.backend.game.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IdlingAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(IdlingAction.class);
  
  private final Context context;

  public IdlingAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    PlayerReputationResponse response = context.api().fetchReputation(context.gameId());
    context.update(response);
    
    logger.warn("idling, reputation = {}", response);
    context.idle();
    
    return new FetchQuestsAction(context);
  }
}
