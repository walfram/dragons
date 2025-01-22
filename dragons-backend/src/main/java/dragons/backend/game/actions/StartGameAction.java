package dragons.backend.game.actions;

import dragons.backend.game.responses.GameStartResponse;
import dragons.backend.game.responses.ProductResponse;
import dragons.backend.game.Context;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StartGameAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(StartGameAction.class);
  
  private final Context context;

  public StartGameAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    GameStartResponse response = context.api().startGame();
    context.update(response);
    logger.info("start game = {}", response);

    ProductResponse[] products = context.api().fetchProducts(context.gameId());
    logger.debug("products = {}", Arrays.asList(products));
    context.bindProducts(products);

    return new FetchQuestsAction(context);
  }
}
