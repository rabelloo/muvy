export interface Subscription {
  /**
   * Stops receiving change notifications from the `Store`.
   */
  unsubscribe: () => void;
}
