import { Paper } from '@mui/material';
import * as React from 'react';
import ResponsiveAppBar from '../components/AppBar';

const Impressum = (): React.ReactElement => {
  return (
    <>
    <ResponsiveAppBar />
      <Paper elevation={3} sx={{ margin: '20px', paddingLeft: '5px' }}>
        <h1>Impressum</h1>
        <br />
        Angaben gemäß § 5 TMG:
        <br />
        Max Mustermann
        <br />
        Musterstraße 1<br />
        12345 Musterstadt
        <br />
        <br />
        <br />
        Kontakt: <br />
        Telefon: 01234-56789 <br />
        E-Mail: [info@mustermail.de] <br />
        <br />
        <br />
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
        <br />
        Max Mustermann
        <br />
        Musterstraße 1<br />
        12345 Musterstadt
        <br />
        <br />
        <br />
        Haftung für Inhalte
        <br />
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
        <br />
        <br />
        <br />
        Haftung für Links
        <br />
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
        <br />
        <br />
        <br />
        Urheberrecht
        <br />
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </Paper>
    </>
  );
};

export default Impressum;
