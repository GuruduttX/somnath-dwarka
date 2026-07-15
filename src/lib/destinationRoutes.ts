const DESTINATION_ROUTE_SLUGS: Record<string, string> = {
  somnath: "somnath-tour-package",
  dwarka: "dwarka-tour-package",
};

export function destinationRouteSlug(destination: string): string {
  return DESTINATION_ROUTE_SLUGS[destination] ?? destination;
}

export function destinationPath(destination: string): string {
  return `/${destinationRouteSlug(destination)}/`;
}

export function destinationTopicPath(destination: string, topic: string): string {
  return `/${destinationRouteSlug(destination)}/${topic}/`;
}

export function destinationPlacePath(destination: string, place: string): string {
  return `/${destinationRouteSlug(destination)}/places/${place}/`;
}
