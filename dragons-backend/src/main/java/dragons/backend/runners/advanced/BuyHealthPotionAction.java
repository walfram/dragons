package dragons.backend.runners.advanced;

import dragons.backend.game.BuyItemResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BuyHealthPotionAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(BuyHealthPotionAction.class);
  
  private final Context context;

  public BuyHealthPotionAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    if (context.canByHealthPotion()) {
      BuyItemResponse response = context.api().buyItem(context.gameId(), "hpot");
      logger.info("buy health potion = {}", response);
      context.update(response);
    } else {
      logger.warn("cannot buy health potion, gold = {}", context.gold());
    }
    return new FetchQuestsAction(context);
  }
}
