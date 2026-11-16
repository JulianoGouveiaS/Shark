import { SharkMark } from "@/components/shark-mark";

export function SiteHeader() {
  return (
    <header className="bar">
      <a className="brand" href="#topo">
        <SharkMark className="brand-mark" />
        <span>Shark</span>
      </a>
      <nav className="bar-nav" aria-label="Página">
        <a className="text-link" href="#ciclo">
          Como funciona
        </a>
        <a className="btn btn-primary" href="#lista">
          <span className="label-full">Quero na minha garagem</span>
          <span className="label-short">Lista</span>
        </a>
      </nav>
    </header>
  );
}
