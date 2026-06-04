export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-auto border-t border-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800">
              Sobre Bidcom
            </h3>
            <p className="text-sm leading-relaxed">
              Tu tienda online de tecnología. Encontrá las mejores ofertas en
              electrónica, computación, gaming y mucho más con envío a todo el
              país.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800">
              Medios de pago
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Visa / Mastercard / Amex</li>
              <li>Mercado Pago</li>
              <li>Transferencia bancaria</li>
              <li>Hasta 12 cuotas sin interés</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800">
              Envíos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Envío gratis en compras mayores a $50.000</li>
              <li>Retiro en sucursal sin cargo</li>
              <li>Entregas en 24-72hs (AMBA)</li>
              <li>Envíos a todo el país</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Lunes a viernes de 9 a 18hs</li>
              <li>atencionalcliente@bidcom.com.ar</li>
              <li>Tel: 0810-333-2432</li>
              <li>CABA, Argentina</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 Bidcom. Todos los derechos reservados.</p>
          <p className="mt-1">
            Precios expresados en dólares americanos (US$). Los precios y la
            disponibilidad están sujetos a cambio sin previo aviso.
          </p>
        </div>
      </div>
    </footer>
  );
}
