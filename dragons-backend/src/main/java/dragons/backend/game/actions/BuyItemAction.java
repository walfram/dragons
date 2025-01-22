package dragons.backend.game.actions;

import dragons.backend.game.BuyItemResponse;
import dragons.backend.game.ProductResponse;
import dragons.backend.game.Context;
import java.util.Comparator;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BuyItemAction implements Action {

  private static final Logger logger = LoggerFactory.getLogger(BuyItemAction.class);
  
  private final Context context;

  public BuyItemAction(Context context) {
    this.context = context;
  }

  @Override
  public Action exec() {
    Optional<ProductResponse> first = context.affordableProducts().stream().max(Comparator.comparing(ProductResponse::cost));
    
    if (first.isPresent()) {
      logger.info("buying item = {}", first.get().name());
      BuyItemResponse response = context.api().buyItem(context.gameId(), first.get().id());
      logger.debug("purchase result = {}", response);
      context.update(response);
    } else {
      logger.warn("could not pick item to buy");
    }

    return new FetchQuestsAction(context);
  }
}
