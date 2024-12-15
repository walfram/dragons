export function first5Words(source: string): string {
  return source.split(" ").slice(0, 5).join(" ").concat("...");
}
