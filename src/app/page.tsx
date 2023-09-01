import DigitalIDForm from "../components/DigitalIDForm";
import PageWrapper from "./page-wrapper";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageWrapper>
      <main className={styles.container}>
        <DigitalIDForm />
      </main>
    </PageWrapper>
  );
}
