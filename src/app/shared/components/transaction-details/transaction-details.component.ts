import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../../core/types/transaction.type';
import { TransactionService } from '../../../core/services/transaction.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction,
    private readonly snackBar: MatSnackBar,
    private readonly transactionService: TransactionService,
  ) { }

  async onClickDownloadReceipt() {
    this.transactionService.downloadReceipt(this.transaction.id)
      .subscribe(async (response: HttpResponse<Blob>) => {
        const blob = response.body;
        if (!blob) {
          this.showErrorMessage();
          return;
        }
        const filename = this.getFilenameFromContentDisposition(response.headers.get('content-disposition'));

        if ('showSaveFilePicker' in window) {
          await this.downloadFileWithFilePicker(blob, filename);
        } else {
          this.downloadFile(blob, filename);
        }
      }, _ => {
        this.showErrorMessage();
      });
  }

  private getFilenameFromContentDisposition(contentDisposition: string | null): string {
    console.log('contentDisposition', contentDisposition);
    if (!contentDisposition) {
      return 'comprovante.pdf';
    }
    const matches = contentDisposition.match(/filename="?([^"]+)"?/);
    return matches && matches[1] ? matches[1] : 'comprovante.pdf';
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private async downloadFileWithFilePicker(blob: Blob, filename: string) {
    try {
      // @ts-ignore
      const handle = await window.showSaveFilePicker({ suggestedName: filename });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      this.showErrorMessage();
    }
  }

  private showErrorMessage() {
    this.snackBar.open('Erro ao fazer download do comprovante.', 'Fechar', { duration: 5000, verticalPosition: 'top', panelClass: 'snack-error' });
  }
}
