import styles from "./Download.module.css";

function Download() {
    const resumeURL = '/resume.pdf';
  
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = resumeURL;
      link.download = 'Myresume_Abhilash_yadav.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);    
    };
  
    return (
      <button onClick={handleDownload} className={styles.downloadBtn}>Download Resume</button>
    );
  }
  
  export default Download;