document.addEventListener('DOMContentLoaded', function() {
  // 総セクション数
  const totalSections = 8; // セクション0から7まで
  
  // 現在のセクションインデックス
  let currentSectionIndex = 0;
  
  // 選択肢を持つ質問フィールドを変換する
  convertInputsToSelections();
  
  // 選択式回答が可能であることを通知するメッセージを表示
  showSelectionNotification();
  
  // ウェルカムページから開始ボタンのイベントリスナー
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      document.getElementById('section-welcome').classList.add('hidden');
      showSection(0);
    });
  }
  
  // 選択式入力が可能なことを伝える通知を表示
  function showSelectionNotification() {
    // 通知要素の作成
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-content">
        <strong>選択式で簡単回答！</strong>
        <p>多くの質問は選択するだけで回答できます。「複数選択可」と表示されている項目は、複数のオプションを選択できます。選択したものをもう一度クリックすると選択解除できます。</p>
        <button class="close-btn">閉じる</button>
      </div>
    `;
    
    // bodyに追加
    document.body.appendChild(notification);
    
    // 閉じるボタンのイベント
    notification.querySelector('.close-btn').addEventListener('click', function() {
      notification.classList.add('fade-out');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // 自動的に5秒後に閉じる
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.add('fade-out');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 8000); // 通知の表示時間を8秒に延長
  }
  
  // プログレスバーの更新
  function updateProgress(currentSection) {
    const progressPercentage = (currentSection / (totalSections - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('current-section').textContent = `セクション: ${currentSection}/${totalSections - 1}`;
    document.getElementById('progress-percentage').textContent = `${Math.round(progressPercentage)}%`;
  }
  
  // テキスト入力フィールドを選択式に変換する関数
  function convertInputsToSelections() {
    // 企業理念の選択式変換は削除
    
    // ウェブサイトの課題タイプの選択肢
    createSelectionButtons('website-issues-container', [
      { value: 'デザイン古い', label: 'デザインが古い' },
      { value: 'スマホ非対応', label: 'スマホ対応していない' },
      { value: 'アクセス少ない', label: 'アクセス数が少ない' },
      { value: '問い合わせ少ない', label: '問い合わせが少ない' },
      { value: '更新難しい', label: '更新が難しい' },
      { value: '情報不足', label: '情報が不足している' },
      { value: 'ブランド不一致', label: 'ブランドイメージと一致していない' },
      { value: '機能不足', label: '必要な機能が足りない' },
      { value: 'セキュリティ問題', label: 'セキュリティに問題がある' },
      { value: '表示速度遅い', label: '表示速度が遅い' }
    ], true);
    
    // ウェブサイトの成果期待の選択肢
    createSelectionButtons('expected-outcome-container', [
      { value: '問い合わせ増加', label: '問い合わせの増加' },
      { value: '認知度向上', label: '認知度の向上' },
      { value: '顧客獲得', label: '新規顧客の獲得' },
      { value: 'ブランド強化', label: 'ブランドイメージの強化' },
      { value: '採用促進', label: '採用活動の促進' },
      { value: '情報提供効率化', label: '情報提供の効率化' },
      { value: '売上向上', label: '売上・収益の向上' },
      { value: 'オンライン販売', label: 'オンライン販売の実現' },
      { value: '顧客満足度向上', label: '顧客満足度の向上' },
      { value: '業務効率化', label: '社内業務の効率化' }
    ], true);
    
    // ターゲットオーディエンスの選択肢 - カテゴリ別に整理
    setupCategorizedTargetAudience();
    
    // サイトの雰囲気の選択肢
    createSelectionButtons('site-atmosphere-container', [
      { value: 'プロフェッショナル', label: 'プロフェッショナル' },
      { value: 'フレンドリー', label: 'フレンドリー・親しみやすい' },
      { value: '高級感', label: '高級感・洗練された' },
      { value: 'シンプル', label: 'シンプル・明快' },
      { value: '革新的', label: '革新的・先進的' },
      { value: '伝統的', label: '伝統的・信頼感' },
      { value: 'クリエイティブ', label: 'クリエイティブ・個性的' },
      { value: 'モダン', label: 'モダン・現代的' },
      { value: 'カジュアル', label: 'カジュアル・気軽な' },
      { value: '温かみ', label: '温かみのある・親密な' },
      { value: '信頼感', label: '信頼感・安心感のある' },
      { value: '活気的', label: '活気ある・エネルギッシュな' }
    ], true);
    
    // カラーテーマの選択肢
    createSelectionButtons('color-theme-container', [
      { value: 'モノトーン', label: 'モノトーン（黒・白・グレー）' },
      { value: 'ブルー系', label: 'ブルー系（信頼・安定）' },
      { value: 'グリーン系', label: 'グリーン系（自然・安心）' },
      { value: 'レッド系', label: 'レッド系（情熱・活力）' },
      { value: 'オレンジ系', label: 'オレンジ系（親しみ・元気）' },
      { value: 'パープル系', label: 'パープル系（創造・高貴）' },
      { value: '企業カラー', label: '企業カラーに合わせる' }
    ], true);
    
    // 製品・サービス情報セクションの選択肢
    // 製品・サービスの主な特徴や強み
    createSelectionButtons('product-features-container', [
      { value: '高品質', label: '高品質・信頼性' },
      { value: '独自技術', label: '独自の技術・特許' },
      { value: 'コストパフォーマンス', label: 'コストパフォーマンス' },
      { value: '充実サポート', label: '充実したサポート体制' },
      { value: '豊富実績', label: '豊富な実績・事例' },
      { value: '業界最先端', label: '業界最先端の機能' },
      { value: '使いやすさ', label: '使いやすさ・シンプルさ' },
      { value: 'カスタマイズ性', label: 'カスタマイズ性・柔軟性' },
      { value: '納期スピード', label: '納期の早さ・スピード' },
      { value: 'セキュリティ', label: '高いセキュリティ' }
    ], true);
    
    // 製品カテゴリ分類
    createSelectionButtons('product-category-container', [
      { value: '用途別', label: '用途別' },
      { value: '機能別', label: '機能別' },
      { value: '業界別', label: '業界・業種別' },
      { value: '価格帯別', label: '価格帯別' },
      { value: '対象ユーザー別', label: '対象ユーザー別' },
      { value: 'シリーズ別', label: 'シリーズ・ブランド別' },
      { value: '技術別', label: '技術・素材別' }
    ], false);
    
    // 技術・運用面セクションの選択肢
    // サイト管理担当
    createSelectionButtons('site-management-container', [
      { value: '自社', label: '自社で管理' },
      { value: '外部委託', label: '外部に委託' },
      { value: '共同管理', label: '自社と外部で共同管理' },
      { value: '未定', label: '未定' }
    ], false);
    
    // セキュリティ対策
    createSelectionButtons('security-focus-container', [
      { value: 'SSL証明書', label: 'SSL証明書（https化）' },
      { value: 'ファイアウォール', label: 'ファイアウォール設定' },
      { value: '定期バックアップ', label: '定期バックアップ' },
      { value: 'アクセス制限', label: '管理画面のアクセス制限' },
      { value: 'マルウェア対策', label: 'マルウェア対策' },
      { value: 'セキュリティ監査', label: '定期的なセキュリティ監査' },
      { value: 'お任せ', label: 'お任せ' }
    ], true);
    
    // バックアップ体制
    createSelectionButtons('backup-plan-container', [
      { value: '定期自動', label: '定期的な自動バックアップ' },
      { value: 'クラウド', label: 'クラウドへのバックアップ' },
      { value: '複数サーバー', label: '複数サーバーでの冗長化' },
      { value: '障害時サポート', label: '障害時の迅速なサポート体制' },
      { value: 'お任せ', label: 'お任せ' }
    ], true);
    
    // URLの動的入力フィールドを設定
    setupUrlInputAdder();
    
    // モバイル優先度のフィールドを設定
    setupMobilePriorities();
    
    // 掲載コンテンツのフィールドを設定
    setupMainContents();
  }
  
  // 参考サイトURLを1つずつ入力できる機能
  function setupUrlInputAdder() {
    const referenceContainer = document.getElementById('reference-sites-container');
    if (!referenceContainer) return;
    
    // 既存のテキストエリアを非表示
    const existingTextarea = referenceContainer.querySelector('textarea');
    if (existingTextarea) {
      existingTextarea.style.display = 'none';
      existingTextarea.classList.add('hidden');
    }
    
    // URLフィールドのコンテナを作成
    const urlFieldsContainer = document.createElement('div');
    urlFieldsContainer.className = 'url-fields-container';
    referenceContainer.appendChild(urlFieldsContainer);
    
    // 初期URLフィールドを追加
    addUrlField(urlFieldsContainer, existingTextarea);
    
    // 「URL追加」ボタンを作成
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'add-url-btn';
    addButton.textContent = 'URLを追加';
    addButton.addEventListener('click', function() {
      addUrlField(urlFieldsContainer, existingTextarea);
    });
    
    referenceContainer.appendChild(addButton);
  }
  
  // URLフィールドを追加する関数
  function addUrlField(container, hiddenTextarea) {
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'url-field-group';
    
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.placeholder = 'https://www.example.com';
    urlInput.className = 'url-input';
    
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = '参考にしたい点（任意）';
    commentInput.className = 'url-comment';
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-url-btn';
    removeBtn.textContent = '削除';
    removeBtn.addEventListener('click', function() {
      container.removeChild(fieldGroup);
      updateHiddenTextarea(container, hiddenTextarea);
    });
    
    fieldGroup.appendChild(urlInput);
    fieldGroup.appendChild(commentInput);
    fieldGroup.appendChild(removeBtn);
    container.appendChild(fieldGroup);
    
    // 入力イベントの設定
    urlInput.addEventListener('input', function() {
      updateHiddenTextarea(container, hiddenTextarea);
    });
    
    commentInput.addEventListener('input', function() {
      updateHiddenTextarea(container, hiddenTextarea);
    });
    
    // フォーカスを新しいURLフィールドに設定
    urlInput.focus();
  }
  
  // 非表示のテキストエリアを更新する関数
  function updateHiddenTextarea(container, textarea) {
    if (!textarea) return;
    
    const urlGroups = container.querySelectorAll('.url-field-group');
    let combinedText = '';
    
    urlGroups.forEach(group => {
      const url = group.querySelector('.url-input').value;
      const comment = group.querySelector('.url-comment').value;
      
      if (url) {
        combinedText += url;
        if (comment) {
          combinedText += ' - ' + comment;
        }
        combinedText += '\n';
      }
    });
    
    textarea.value = combinedText.trim();
  }
  
  // カラーピッカーを設定する関数
  function setupColorPickers() {
    const brandColorsContainer = document.getElementById('brand-colors-container');
    if (!brandColorsContainer) return;
    
    // 既存のテキストエリアを非表示
    const existingTextarea = brandColorsContainer.querySelector('textarea');
    if (existingTextarea) {
      existingTextarea.style.display = 'none';
      existingTextarea.classList.add('hidden');
    }
    
    // カラーピッカーのコンテナを作成
    const colorPickersContainer = document.createElement('div');
    colorPickersContainer.className = 'color-pickers-container';
    
    // 代表色（プライマリカラー）
    const primaryColorGroup = document.createElement('div');
    primaryColorGroup.className = 'color-picker-group';
    
    const primaryColorLabel = document.createElement('label');
    primaryColorLabel.textContent = 'メインカラー';
    primaryColorLabel.htmlFor = 'primary-color-picker';
    
    const primaryColorPicker = document.createElement('input');
    primaryColorPicker.type = 'color';
    primaryColorPicker.id = 'primary-color-picker';
    primaryColorPicker.className = 'color-picker';
    primaryColorPicker.value = '#0066cc'; // デフォルト値
    
    const primaryColorText = document.createElement('input');
    primaryColorText.type = 'text';
    primaryColorText.className = 'color-text';
    primaryColorText.value = '#0066cc';
    primaryColorText.placeholder = 'カラーコード';
    
    primaryColorGroup.appendChild(primaryColorLabel);
    primaryColorGroup.appendChild(primaryColorPicker);
    primaryColorGroup.appendChild(primaryColorText);
    
    // アクセントカラー（セカンダリカラー）
    const accentColorGroup = document.createElement('div');
    accentColorGroup.className = 'color-picker-group';
    
    const accentColorLabel = document.createElement('label');
    accentColorLabel.textContent = 'アクセントカラー';
    accentColorLabel.htmlFor = 'accent-color-picker';
    
    const accentColorPicker = document.createElement('input');
    accentColorPicker.type = 'color';
    accentColorPicker.id = 'accent-color-picker';
    accentColorPicker.className = 'color-picker';
    accentColorPicker.value = '#ff9900'; // デフォルト値
    
    const accentColorText = document.createElement('input');
    accentColorText.type = 'text';
    accentColorText.className = 'color-text';
    accentColorText.value = '#ff9900';
    accentColorText.placeholder = 'カラーコード';
    
    accentColorGroup.appendChild(accentColorLabel);
    accentColorGroup.appendChild(accentColorPicker);
    accentColorGroup.appendChild(accentColorText);
    
    // 背景色
    const bgColorGroup = document.createElement('div');
    bgColorGroup.className = 'color-picker-group';
    
    const bgColorLabel = document.createElement('label');
    bgColorLabel.textContent = '背景色';
    bgColorLabel.htmlFor = 'bg-color-picker';
    
    const bgColorPicker = document.createElement('input');
    bgColorPicker.type = 'color';
    bgColorPicker.id = 'bg-color-picker';
    bgColorPicker.className = 'color-picker';
    bgColorPicker.value = '#ffffff'; // デフォルト値
    
    const bgColorText = document.createElement('input');
    bgColorText.type = 'text';
    bgColorText.className = 'color-text';
    bgColorText.value = '#ffffff';
    bgColorText.placeholder = 'カラーコード';
    
    bgColorGroup.appendChild(bgColorLabel);
    bgColorGroup.appendChild(bgColorPicker);
    bgColorGroup.appendChild(bgColorText);
    
    colorPickersContainer.appendChild(primaryColorGroup);
    colorPickersContainer.appendChild(accentColorGroup);
    colorPickersContainer.appendChild(bgColorGroup);
    
    // 追加の説明文
    const colorDescription = document.createElement('div');
    colorDescription.className = 'color-description';
    colorDescription.innerHTML = `
      <p class="hint">色を選択するか、カラーコード（例: #FF0000）を直接入力できます。</p>
      <p class="hint">企業カラーや、サイトに合った色の組み合わせを選んでください。</p>
    `;
    
    // 元のテキストエリアの前に挿入
    brandColorsContainer.insertBefore(colorPickersContainer, existingTextarea);
    brandColorsContainer.insertBefore(colorDescription, existingTextarea);
    
    // カラーピッカーの値変更時のイベント処理
    primaryColorPicker.addEventListener('input', function() {
      primaryColorText.value = this.value;
      updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
    });
    
    accentColorPicker.addEventListener('input', function() {
      accentColorText.value = this.value;
      updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
    });
    
    bgColorPicker.addEventListener('input', function() {
      bgColorText.value = this.value;
      updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
    });
    
    // テキスト入力の値変更時のイベント処理
    primaryColorText.addEventListener('input', function() {
      if (isValidColorCode(this.value)) {
        primaryColorPicker.value = this.value;
        updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
      }
    });
    
    accentColorText.addEventListener('input', function() {
      if (isValidColorCode(this.value)) {
        accentColorPicker.value = this.value;
        updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
      }
    });
    
    bgColorText.addEventListener('input', function() {
      if (isValidColorCode(this.value)) {
        bgColorPicker.value = this.value;
        updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
      }
    });
    
    // 初期値をテキストエリアに設定
    updateColorTextarea(existingTextarea, primaryColorPicker, accentColorPicker, bgColorPicker);
  }
  
  // カラーコードが有効かチェックする関数
  function isValidColorCode(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
  }
  
  // 非表示のテキストエリアにカラーコードを更新する関数
  function updateColorTextarea(textarea, primaryPicker, accentPicker, bgPicker) {
    if (!textarea) return;
    
    textarea.value = `メインカラー: ${primaryPicker.value}\nアクセントカラー: ${accentPicker.value}\n背景色: ${bgPicker.value}`;
  }
  
  // ロゴアップロード機能の設定
  const logoRadioButtons = document.querySelectorAll('input[name="has-logo"]');
  logoRadioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      const logoUploadSection = document.getElementById('logo-upload-section');
      const logoDetails = document.getElementById('logo-details');
      
      if (this.value === 'あり') {
        logoUploadSection.classList.remove('hidden');
        logoDetails.classList.remove('hidden');
      } else {
        logoUploadSection.classList.add('hidden');
        logoDetails.classList.add('hidden');
      }
    });
  });
  
  // カラーピッカーの設定を呼び出す
  setupColorPickers();
  
  // ファイルアップロード表示処理
  const logoFileInput = document.getElementById('logo-file');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', function() {
      const fileLabel = document.querySelector('.file-upload-label');
      if (this.files.length > 0) {
        fileLabel.textContent = `選択されたファイル: ${this.files[0].name}`;
        fileLabel.classList.add('has-file');
      } else {
        fileLabel.textContent = 'ロゴファイルをアップロード';
        fileLabel.classList.remove('has-file');
      }
    });
  }
  
  // 選択ボタンのクリックイベント - 処理を集約
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('option-btn')) {
      const button = e.target;
      const value = button.getAttribute('data-value');
      const optionsContainer = button.closest('.options, .mobile-options, .content-options, .target-options'); // 親コンテナを取得
      
      if (!optionsContainer) {
        // 'target-audience-container' 内のボタンなど、直接の親が .options でない場合も考慮
        const targetContainer = button.closest('#target-audience-container');
        if (targetContainer && button.classList.contains('target-btn')) {
          // ターゲットオーディエンスの処理 (setupCategorizedTargetAudience 内のロジックを参照)
          button.classList.toggle('selected');
          const existingTextarea = document.getElementById('target-audience'); // hidden ではなく textarea を想定
          if (existingTextarea) {
             updateTargetAudienceValue(targetContainer, existingTextarea);
          }
          return; // ターゲットオーディエンス専用処理後は終了
        }
        console.warn('Could not find options container for button:', button);
        return; // コンテナが見つからない場合は処理中断
      }

      // 関連する input (hidden または textarea) を特定する改善された方法
      let targetInput = null;
      // 1. data-target-input 属性を探す (推奨)
      const targetInputId = optionsContainer.dataset.targetInput || button.dataset.targetInput;
      if (targetInputId) {
        targetInput = document.getElementById(targetInputId);
      }
      // 2. コンテナの次の要素が input[type="hidden"] か textarea か確認 (既存の構造依存)
      if (!targetInput) {
         targetInput = optionsContainer.nextElementSibling;
         if (!targetInput || (targetInput.tagName !== 'INPUT' && targetInput.tagName !== 'TEXTAREA') || (targetInput.tagName === 'INPUT' && targetInput.type !== 'hidden')) {
           // 特定のIDパターンも試す（例: design-taste-other のような入力フィールドは対象外にする）
           const baseId = optionsContainer.id ? optionsContainer.id.replace('-container', '') : (button.closest('.question')?.querySelector('input, textarea')?.id);
           if (baseId && !baseId.endsWith('-other')) {
              targetInput = document.getElementById(baseId) || document.getElementById(baseId.replace('-options', '')) || document.getElementById(baseId.replace('-buttons', ''));
              // それでも見つからなければ、関連する質問内の hidden input を探す
              if (!targetInput) {
                 const questionDiv = button.closest('.question');
                 if (questionDiv) {
                    targetInput = questionDiv.querySelector('input[type="hidden"], textarea:not([id*="-other"])');
                 }
              }
           } else {
             targetInput = null; // 見つからない場合は null のまま
           }
         }
      }
       // 'その他'ボタンの特殊処理
       if (button.classList.contains('other-option')) {
           // 'その他'ボタン固有の処理
           const inputField = optionsContainer.nextElementSibling; // 通常、テキストエリアや入力フィールドが続く想定
           if (inputField && (inputField.tagName === 'TEXTAREA' || inputField.tagName === 'INPUT')) {
               inputField.style.display = '';
               inputField.classList.remove('hidden');
               inputField.value = '';
               inputField.focus();

               // 他のボタンの選択状態を更新
               optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
                   if (btn !== button) {
                       // 複数選択でない場合、または単一選択として扱いたい場合は選択解除
                       if (!optionsContainer.querySelector('.multi-select')) { // コンテナ内に multi-select がなければ単一選択とみなす
                           btn.classList.remove('selected');
                       }
                   }
               });
               button.classList.add('selected'); // その他ボタンを選択状態に

               // targetInput (hidden input) の値はクリアするか、'other' などの識別子を入れるか検討
               if (targetInput && targetInput.tagName === 'INPUT' && targetInput.type === 'hidden') {
                   targetInput.value = ''; // 他の選択肢と同時に選択させない場合
               } else if (targetInput && targetInput.tagName === 'TEXTAREA') {
                   targetInput.value = ''; // テキストエリアが直接の値を持つ場合
               }
           }
           return; // その他ボタンの処理後は終了
       }

      // 複数選択可能かどうかの判定 (multi-select クラスの有無)
      const isMultiSelect = button.classList.contains('multi-select') || optionsContainer.querySelector('.multi-select');

      if (isMultiSelect) {
        // 複数選択: 選択状態をトグル
        button.classList.toggle('selected');
        
        // 選択されているすべてのボタンの値を取得（その他ボタンを除く）
        const selectedButtons = optionsContainer.querySelectorAll('.option-btn.selected:not(.other-option)');
        const selectedValues = Array.from(selectedButtons).map(btn => btn.getAttribute('data-value'));
        
        // ターゲット入力フィールドに値を設定（区切り文字 '、'）
        if (targetInput) {
          targetInput.value = selectedValues.join('、');
        } else {
          console.warn('Target input not found for multi-select button:', button);
        }
      } else {
        // 単一選択: 他のボタンの選択を解除し、クリックされたボタンを選択
        optionsContainer.querySelectorAll('.option-btn:not(.other-option)').forEach(otherBtn => {
          otherBtn.classList.remove('selected');
        });
        button.classList.add('selected');
        
        // ターゲット入力フィールドに値を設定
        if (targetInput) {
          targetInput.value = value;
           // もし単一選択時に 'その他' 入力フィールドがあれば非表示にする
           const otherInputField = optionsContainer.nextElementSibling;
           if(otherInputField && otherInputField.classList.contains('other-option-input')) { // 仮のクラス名
               otherInputField.style.display = 'none';
               otherInputField.classList.add('hidden');
           }
           const otherButton = optionsContainer.querySelector('.other-option');
           if (otherButton) {
               otherButton.classList.remove('selected');
           }
        } else {
          console.warn('Target input not found for single-select button:', button);
        }
      }
    } else if (e.target && e.target.classList.contains('entrust-btn')) {
       // 「お任せ」ボタンの処理 (既存のロジックをここに移動または維持)
       const entrustBtn = e.target;
       const brandColorsTextarea = document.getElementById('brand-colors');
       if (brandColorsTextarea) {
           entrustBtn.classList.toggle('selected');
           const colorPickersContainer = document.querySelector('.color-pickers-container');

           if (entrustBtn.classList.contains('selected')) {
               brandColorsTextarea.dataset.previousValue = brandColorsTextarea.value;
               brandColorsTextarea.value = 'デザイナーにお任せします';
               brandColorsTextarea.disabled = true;
               if (colorPickersContainer) colorPickersContainer.style.display = 'none';
           } else {
               brandColorsTextarea.value = brandColorsTextarea.dataset.previousValue || '';
               brandColorsTextarea.disabled = false;
               if (colorPickersContainer) colorPickersContainer.style.display = '';
           }
       }
    }
    // 他のボタンタイプ (例: ナビゲーションボタン) の処理は既存のリスナーで行うか、ここに追加
  });
  
  // 選択ボタンを作成する関数
  function createSelectionButtons(containerId, options, multiSelect = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 既存のテキストエリアまたは入力フィールドを取得
    const input = container.querySelector('textarea, input[type="text"], input[type="hidden"]'); // hidden も対象に
    if (!input) {
       console.warn(`Input field not found in container: ${containerId}`);
       return;
    }
    
    // 入力フィールドのIDとネームを保存
    const inputId = input.id;
    const inputName = input.name;
    
    // 入力フィールドを非表示（完全に削除せず、データは保持）
    input.classList.add('hidden');
    input.style.display = 'none';
    
    // 選択ボタンのコンテナを作成
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'options';
    // ターゲット入力フィールドのIDをコンテナに設定 (汎用リスナーで使うため)
    buttonsContainer.dataset.targetInput = inputId;

    
    // ボタンを作成
    options.forEach(option => {
      const button = document.createElement('button');
      button.type = 'button';
      // multiSelect フラグに基づいてクラスを設定
      button.className = 'option-btn' + (multiSelect ? ' multi-select' : '');
      button.setAttribute('data-value', option.value);
      button.textContent = option.label;
      
      // ボタンクリックイベントリスナーは削除 (汎用リスナーで処理)
      // button.addEventListener('click', function() { ... }); // 削除
      
      buttonsContainer.appendChild(button);
    });
    
    // その他のオプションを追加（テキスト入力可能に） - createSelectionButtons では汎用的に追加しない方が良い場合も
    // 必要に応じて呼び出し元で個別に設定するか、フラグで制御する
    /* // 一旦コメントアウト
    const otherButton = document.createElement('button');
    otherButton.type = 'button';
    otherButton.className = 'option-btn other-option';
    otherButton.setAttribute('data-value', 'other');
    otherButton.textContent = 'その他（入力）';
    
    otherButton.addEventListener('click', function() {
      // 汎用リスナーで処理するため、ここでのリスナーは不要
    });
    
    buttonsContainer.appendChild(otherButton);
    */
    
    // 入力フィールドの前に選択ボタンを挿入
    input.parentNode.insertBefore(buttonsContainer, input);
    
    // 関連するテキスト入力フィールド（例: 'その他'用）があれば、blur イベントで 'その他' ボタンの状態を制御
    const otherInputField = input.parentNode.querySelector('textarea:not(.hidden), input[type="text"]:not(.hidden)');
    if (otherInputField) {
        otherInputField.addEventListener('blur', function() {
            const otherButton = buttonsContainer.querySelector('.other-option');
            if (otherButton) {
                if (this.value.trim() === '') {
                    // 値が空の場合、その他ボタンの選択を解除し、フィールドを非表示
                    otherButton.classList.remove('selected');
                    this.style.display = 'none';
                    this.classList.add('hidden');
                } else {
                    // 値がある場合はその他ボタンを選択状態にする
                    otherButton.classList.add('selected');
                     // 複数選択でない場合は、他の選択肢の選択を解除するロジックが必要かもしれない
                     if (!multiSelect) {
                        buttonsContainer.querySelectorAll('.option-btn:not(.other-option)').forEach(btn => btn.classList.remove('selected'));
                        // hidden input の値も更新
                        if(input.tagName === 'INPUT' && input.type === 'hidden') {
                            input.value = ''; // 'その他' が選択されたら他の値はクリア (単一選択の場合)
                        }
                    }
                }
            }
        });
    }
  }
  
  // ターゲットとなる訪問者をカテゴリ別に設定する関数
  function setupCategorizedTargetAudience() {
    const container = document.getElementById('target-audience-container');
    if (!container) return;
    
    // 既存のテキストエリアを非表示
    const existingTextarea = container.querySelector('textarea');
    if (existingTextarea) {
      existingTextarea.style.display = 'none';
      existingTextarea.classList.add('hidden');
    }
    
    // カテゴリ別の選択肢
    const categories = [
      {
        name: '年齢層',
        options: [
          { value: '10代', label: '10代' },
          { value: '20代前半', label: '20代前半' },
          { value: '20代後半', label: '20代後半' },
          { value: '30代', label: '30代' },
          { value: '40代', label: '40代' },
          { value: '50代', label: '50代' },
          { value: '60代以上', label: '60代以上' },
          { value: 'シニア層', label: 'シニア層全般' }
        ]
      },
      {
        name: '性別',
        options: [
          { value: '男性', label: '男性中心' },
          { value: '女性', label: '女性中心' },
          { value: '男女均等', label: '男女均等' }
        ]
      },
      {
        name: '職業・役職',
        options: [
          { value: '経営者・役員', label: '経営者・役員' },
          { value: '管理職', label: '管理職' },
          { value: '会社員', label: '会社員全般' },
          { value: '公務員', label: '公務員' },
          { value: '自営業', label: '自営業' },
          { value: '専門職', label: '専門職（医師・弁護士等）' },
          { value: '技術者', label: '技術者・エンジニア' },
          { value: 'クリエイター', label: 'クリエイター・デザイナー' },
          { value: '学生', label: '学生' },
          { value: '主婦・主夫', label: '主婦・主夫' }
        ]
      },
      {
        name: '部署・担当',
        options: [
          { value: '人事部', label: '人事部・採用担当者' },
          { value: '総務部', label: '総務部' },
          { value: '経理・財務', label: '経理・財務' },
          { value: '営業部', label: '営業部' },
          { value: 'マーケティング', label: 'マーケティング部' },
          { value: '企画部', label: '企画部' },
          { value: '開発部', label: '開発部' },
          { value: 'IT部門', label: 'IT部門' },
          { value: '購買・調達', label: '購買・調達担当者' }
        ]
      },
      {
        name: 'ライフスタイル',
        options: [
          { value: '独身', label: '独身' },
          { value: '夫婦', label: '夫婦（子供なし）' },
          { value: '子育て世代', label: '子育て世代' },
          { value: '子供独立後', label: '子供独立後' },
          { value: '富裕層', label: '富裕層' },
          { value: '一人暮らし', label: '一人暮らし' },
          { value: '同居家族あり', label: '同居家族あり' }
        ]
      },
      {
        name: '特性',
        options: [
          { value: '地域住民', label: '地域住民' },
          { value: '観光客', label: '観光客' },
          { value: '訪日外国人', label: '訪日外国人' },
          { value: '法人顧客', label: '法人顧客' },
          { value: '個人顧客', label: '個人顧客' },
          { value: '新規顧客', label: '新規顧客' },
          { value: 'リピーター', label: 'リピーター' }
        ]
      }
    ];
    
    // カテゴリごとのコンテナを作成
    categories.forEach(category => {
      // カテゴリヘッダーを作成
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'target-category-header';
      categoryHeader.textContent = category.name;
      container.appendChild(categoryHeader);
      
      // ボタングループを作成
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'options target-options';
      
      // 選択肢ボタンを作成
      category.options.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-btn multi-select target-btn';
        button.setAttribute('data-value', option.value);
        button.setAttribute('data-category', category.name);
        button.textContent = option.label;
        
        // ボタンクリックイベントリスナーは削除 (汎用リスナーで処理)
        
        buttonGroup.appendChild(button);
      });
      
      container.appendChild(buttonGroup);
    });
    
    // その他入力のための追加フィールド
    const otherField = document.createElement('div');
    otherField.className = 'target-other-field mt-3';
    otherField.innerHTML = `
      <input type="text" id="target-audience-other" placeholder="その他のターゲット層があれば入力してください" class="target-other-input">
    `;
    container.appendChild(otherField);
    
    // その他入力のイベント
    const otherInput = otherField.querySelector('input');
    otherInput.addEventListener('input', function() {
      updateTargetAudienceValue(container, existingTextarea);
    });
  }
  
  // ターゲットオーディエンスの値を更新する関数
  function updateTargetAudienceValue(container, textarea) {
    // すべての選択されたボタンを取得
    const selectedButtons = container.querySelectorAll('.target-btn.selected');
    
    // カテゴリごとに選択された値を整理
    const categorizedValues = {};
    selectedButtons.forEach(button => {
      const category = button.getAttribute('data-category');
      const value = button.getAttribute('data-value');
      
      if (!categorizedValues[category]) {
        categorizedValues[category] = [];
      }
      
      categorizedValues[category].push(value);
    });
    
    // その他の入力値を取得
    const otherInput = container.querySelector('.target-other-input');
    const otherValue = otherInput ? otherInput.value.trim() : '';
    
    // 整形された文字列を作成
    let formattedValue = '';
    for (const category in categorizedValues) {
      if (categorizedValues[category].length > 0) {
        formattedValue += `【${category}】${categorizedValues[category].join('、')}　`;
      }
    }
    
    // その他の値があれば追加
    if (otherValue) {
      formattedValue += `【その他】${otherValue}`;
    }
    
    // テキストエリアに設定
    if (textarea) {
      textarea.value = formattedValue.trim();
    }
  }
  
  // モバイル優先度の設定
  function setupMobilePriorities() {
    // ボタンに multi-select クラスが付与されていれば汎用リスナーが処理するため、
    // ここでの個別のリスナー設定は不要
    // const mobileButtons = document.querySelectorAll('.mobile-options .option-btn');
    // const mobileHiddenInput = document.getElementById('mobile-priorities');
    // const mobileTextarea = document.getElementById('mobile-priority'); // 元の textarea も更新する必要があるか確認
    
    // mobileButtons.forEach(button => {
    //   button.addEventListener('click', function() { ... }); // 削除
    // });

    // 必要であれば、コンテナに data-target-input 属性を設定
    const container = document.querySelector('.mobile-options');
    if (container && document.getElementById('mobile-priorities')) {
        container.dataset.targetInput = 'mobile-priorities';
        // 元の textarea も連動させる場合、汎用リスナー側での対応が必要になるか、
        // またはここで別途リスナーを追加する必要があるかもしれない。
        // 一旦 hidden input の更新に集中する。
        const mobileTextarea = document.getElementById('mobile-priority');
        if (mobileTextarea) {
             // テキストエリアを非表示にする処理は convertInputsToSelections で行われているはず
             // mobileTextarea.style.display = 'none';
             // mobileTextarea.classList.add('hidden');
        }
    }
  }
  
  // 掲載コンテンツの設定
  function setupMainContents() {
    // ボタンに multi-select クラスが付与されていれば汎用リスナーが処理するため、
    // ここでの個別のリスナー設定は不要
    // const contentButtons = document.querySelectorAll('.content-options .option-btn');
    // const contentHiddenInput = document.getElementById('main-contents');
    // const contentTextarea = document.getElementById('main-content');
    
    // contentButtons.forEach(button => {
    //   button.addEventListener('click', function() { ... }); // 削除
    // });
     // 必要であれば、コンテナに data-target-input 属性を設定
    const container = document.querySelector('.content-options');
    if (container && document.getElementById('main-contents')) {
        container.dataset.targetInput = 'main-contents';
         const contentTextarea = document.getElementById('main-content');
         if (contentTextarea) {
              // テキストエリアを非表示にする処理は convertInputsToSelections で行われているはず
              // contentTextarea.style.display = 'none';
              // contentTextarea.classList.add('hidden');
         }
    }
  }
  
  // デザインテイストの選択が行えることを複数選択で処理
  const designTasteContainer = document.querySelector('#section-3 .options:first-of-type'); // コンテナ特定
  if (designTasteContainer && document.getElementById('design-taste')) {
      designTasteContainer.dataset.targetInput = 'design-taste';
      // ボタンへのリスナー設定は不要 (汎用リスナーで処理)
      // const designTasteButtons = designTasteContainer.querySelectorAll('.option-btn');
      // designTasteButtons.forEach(button => { ... }); // 削除
  }
  
  // アニメーション設定の複数選択対応
  const animationContainer = document.querySelector('#section-3 .options:last-of-type'); // コンテナ特定
  if (animationContainer && document.getElementById('animation-preference')) {
      animationContainer.dataset.targetInput = 'animation-preference';
      // ボタンへの multi-select クラス付与とリスナー設定は不要 (汎用リスナーで処理)
      // const animationButtons = animationContainer.querySelectorAll('.option-btn');
      // animationButtons.forEach(button => { ... }); // 削除
  }
  
  // フォント種類の複数選択対応
  const fontContainer = document.querySelector('#section-3 .options:nth-of-type(3)'); // コンテナ特定
  if (fontContainer && document.getElementById('font-preference')) {
      fontContainer.dataset.targetInput = 'font-preference';
      // ボタンへの multi-select クラス付与とリスナー設定は不要 (汎用リスナーで処理)
      // const fontButtons = fontContainer.querySelectorAll('.option-btn');
      // fontButtons.forEach(button => { ... }); // 削除
  }

  // セクションを表示する関数
  function showSection(sectionIndex) {
    // すべてのセクションを非表示
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
      section.classList.add('hidden');
    });
    
    // 指定されたセクションを表示
    const currentSection = document.getElementById(`section-${sectionIndex}`);
    if (currentSection) {
      currentSection.classList.remove('hidden');
      
      // 最終セクション（ヒアリング結果）の場合はサマリーを生成
      if (sectionIndex === totalSections - 1) {
        generateSummary();
      }
      
      // 現在のセクションインデックスを更新
      currentSectionIndex = sectionIndex;
      
      // プログレスバーの更新
      updateProgress(sectionIndex);
      
      // ページトップにスクロール
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // ホームボタンの処理（TOPページへ戻るボタン）
  const homeButtons = document.querySelectorAll('.home-btn');
  homeButtons.forEach(button => {
    button.addEventListener('click', function() {
      showSection(0); // セクション0（TOPページ）に戻る
    });
  });

  // 「次へ」ボタンのイベントリスナー（下部および上部）
  document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', function() {
      const nextIndex = currentSectionIndex + 1;
      if (nextIndex < totalSections) {
        showSection(nextIndex);
      }
    });
  });

  // 「前へ」ボタンのイベントリスナー（下部および上部）
  document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', function() {
      const prevIndex = currentSectionIndex - 1;
      if (prevIndex >= 0) {
        showSection(prevIndex);
      }
    });
  });

   // ラジオボタンの変更時に関連するテキストエリアの表示/非表示を切り替え
   const radioGroups = document.querySelectorAll('input[type="radio"]');
   radioGroups.forEach(radio => {
     radio.addEventListener('change', function() {
       const name = this.name;
       const value = this.value;
       
       // 特定のラジオボタン選択に応じて表示を切り替えるロジック
       // (例: 既存ウェブサイトの有無)
       if (name === 'has-website') {
         const existingWebsiteSection = document.getElementById('existing-website-section');
         if (existingWebsiteSection) {
           existingWebsiteSection.classList.toggle('hidden', value !== 'あり');
         }
       }
       // (例: ロゴの有無)
       if (name === 'has-logo') {
         const logoDetails = document.getElementById('logo-details');
         const logoUploadSection = document.getElementById('logo-upload-section'); // アップロードセクションも連動させる
         const shouldShowDetails = (value === 'あり' || value === '一部あり');
         const shouldShowUpload = (value === 'あり');
         if (logoDetails) logoDetails.classList.toggle('hidden', !shouldShowDetails);
         if (logoUploadSection) logoUploadSection.classList.toggle('hidden', !shouldShowUpload); 
       }
       // (例: 業種「その他」)
       if (name === 'industry') {
           const otherIndustry = document.getElementById('industry-other');
           if(otherIndustry) otherIndustry.classList.toggle('hidden', value !== 'その他');
       }
       // (例: 支店・営業所)
       if (name === 'has-branch') {
           const branchDetails = document.getElementById('branch-details');
           if(branchDetails) branchDetails.classList.toggle('hidden', value !== 'あり');
       }
       // (例: 画像素材)
       if (name === 'has-images') {
           const imagesDetails = document.getElementById('images-details');
           if(imagesDetails) imagesDetails.classList.toggle('hidden', value !== 'あり' && value !== '一部あり');
       }
       // (例: ビジュアル素材)
       if (name === 'has-visual-assets') {
           const visualAssetsDetails = document.getElementById('visual-assets-details');
           if(visualAssetsDetails) visualAssetsDetails.classList.toggle('hidden', value !== 'あり' && value !== '一部あり');
       }
       // (例: 多言語対応)
       if (name === 'multilingual') {
           const multilingualDetails = document.getElementById('multilingual-details');
           if(multilingualDetails) multilingualDetails.classList.toggle('hidden', value !== '必要' && value !== '将来的に検討');
       }
       
     });
   });

   // チェックボックスの変更時に関連するテキストエリアの表示/非表示を切り替え
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', function() {
       const id = this.id;
       const isChecked = this.checked;
       let detailElement = null;

       // IDに基づいて関連する詳細入力フィールドを特定
       if (id === 'function-other') { // page-other の条件を削除
         detailElement = document.getElementById('function-other-detail');
       } else if (id === 'purpose-other') {
         detailElement = document.getElementById('purpose-other-detail');
       } else if (id === 'action-other') {
         detailElement = document.getElementById('action-other-detail');
       }

       // 詳細入力フィールドが存在すれば表示/非表示を切り替え
       if (detailElement) {
         detailElement.classList.toggle('hidden', !isChecked);
       }
     });
   });

  // ヒアリング結果のサマリーを生成する関数
  function generateSummary() {
    const summaryContent = document.getElementById('summary-content');
    let summaryHTML = '<h3>ヒアリング結果まとめ</h3>';
    
    // 全ての表示されているセクションからデータを取得してまとめる (結果表示セクションを除く)
    const sections = document.querySelectorAll('.section:not(#section-7)'); // ID section-7 が結果表示セクション
    
    // 各セクションごとに処理
    sections.forEach((section, index) => {
      const sectionTitleElement = section.querySelector('.section-title');
      if (!sectionTitleElement) return; // タイトルがないセクションはスキップ
      const sectionTitle = sectionTitleElement.textContent;
      let sectionSummaryHTML = `<h4>${sectionTitle}</h4><ul>`;
      let questionFoundInSection = false;
      
      // 各質問ごとに処理
      const questions = section.querySelectorAll('.question');
      questions.forEach(question => {
        const questionTitleElement = question.querySelector('.question-title');
        if (!questionTitleElement) return;
        const questionTitle = questionTitleElement.textContent;
        let answerValue = '';
        let alreadyProcessedHiddenInputs = []; // 処理済みの hidden input ID を記録

        // ラジオボタン (チェックされているもの)
        const checkedRadio = question.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            answerValue += checkedRadio.labels[0]?.textContent || checkedRadio.value; // ラベルがあればラベルを優先
            // 関連する詳細入力（表示されているもの）
            const detailsId = checkedRadio.name + '-details'; // has-website-details など
            const detailsElem = document.getElementById(detailsId);
            if (detailsElem && !detailsElem.classList.contains('hidden') && detailsElem.value) {
                answerValue += ` (${detailsElem.value})`;
            }
            const otherId = checkedRadio.name + '-other'; // industry-other など
            const otherElem = document.getElementById(otherId);
            if (otherElem && !otherElem.classList.contains('hidden') && otherElem.value) {
                 answerValue += ` (${otherElem.value})`;
            }
        }

        // チェックボックス (チェックされているもの)
        const checkedCheckboxes = question.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedCheckboxes.length > 0) {
          const values = [];
          checkedCheckboxes.forEach(checkbox => {
            values.push(checkbox.labels[0]?.textContent || checkbox.value);
            // 「その他」の詳細入力
            if (checkbox.id.includes('-other')) {
              const detailId = checkbox.id + '-detail'; // page-other-detail など
              const detailElem = document.getElementById(detailId);
              if (detailElem && !detailElem.classList.contains('hidden') && detailElem.value) {
                // 他のチェックボックスの値と区別するため、括弧で囲む
                values[values.length - 1] += ` (${detailElem.value})`; 
              }
            }
          });
          // 既存の回答があれば区切り文字を追加
          answerValue += (answerValue ? ' / ' : '') + values.join('、'); 
        }

        // テキスト入力 (hiddenでない、詳細入力でないもの)
        // url-input, url-comment は setupUrlInputAdder で textarea に集約される想定なのでここでは除外
        const textInputs = question.querySelectorAll('input[type="text"]:not(.hidden):not([id*="-detail"]):not([id*="-other"]), input[type="email"]:not(.hidden), input[type="tel"]:not(.hidden)');
        textInputs.forEach(input => {
          if (input.value) {
            answerValue += (answerValue ? ' / ' : '') + input.value;
          }
        });
        
        // URL入力 (個別フィールドではなく、集約された textarea から取得)
        const urlTextarea = question.querySelector('textarea#reference-sites'); // ID指定
        if(urlTextarea && urlTextarea.value) {
           answerValue += (answerValue ? '<br>' : '') + '参考サイト:<br>' + urlTextarea.value.split('\n').join('<br>'); // replace を split/join に変更
        }

        // テキストエリア (hiddenでない、詳細入力でないもの)
        // urlTextarea, brandColorsTextarea は別途処理
        const textAreas = question.querySelectorAll('textarea:not(.hidden):not([id*="-detail"]):not([id*="-other"]):not(#reference-sites):not(#brand-colors)');
        textAreas.forEach(textarea => {
          if (textarea.value) {
            answerValue += (answerValue ? ' / ' : '') + textarea.value;
          }
        });

        // カラーピッカー (集約された textarea から取得)
        const colorTextarea = question.querySelector('textarea#brand-colors');
        if (colorTextarea && colorTextarea.value) {
             // 「お任せ」の場合とカラーコードの場合で表示を分ける
             if (colorTextarea.value === 'デザイナーにお任せします') {
                  answerValue += (answerValue ? ' / ' : '') + 'ブランドカラー: デザイナーにお任せします';
             } else if (colorTextarea.value.includes('メインカラー:')) { // カラーコードが含まれる場合
                  answerValue += (answerValue ? '<br>' : '') + 'ブランドカラー:<br>' + colorTextarea.value.split('\n').join('<br>'); // replace を split/join に変更
             } else { // それ以外の予期せぬ値
                  answerValue += (answerValue ? ' / ' : '') + colorTextarea.value;
             }
        }

        // ドロップダウン
        const selects = question.querySelectorAll('select:not(.hidden)');
        selects.forEach(select => {
          if (select.value) {
            // value が空でない、かつ "--選択してください--" のようなプレースホルダーでないことを確認
            if (select.value && select.selectedOptions.length > 0 && select.selectedOptions[0].text !== '--選択してください--') { 
              answerValue += (answerValue ? ' / ' : '') + select.selectedOptions[0].text;
            }
          }
        });

        // 選択ボタン (関連付けられた hidden input または textarea の値を取得)
        const optionsContainers = question.querySelectorAll('.options, .mobile-options, .content-options, #target-audience-container .options'); // 対象コンテナをより具体的に
        optionsContainers.forEach(optContainer => {
            const targetInputId = optContainer.dataset.targetInput || (optContainer.closest('#target-audience-container') ? 'target-audience' : null); // target-audience は特別扱い
            if (targetInputId && !alreadyProcessedHiddenInputs.includes(targetInputId)) {
                const targetInput = document.getElementById(targetInputId);
                if (targetInput && targetInput.value) {
                    // target-audience は整形済みなので <br> で表示
                    if (targetInputId === 'target-audience') {
                         answerValue += (answerValue ? '<br>' : '') + targetInput.value.replace(/\n/g, '<br>'); // 正規表現の修正
                    } else {
                         answerValue += (answerValue ? ' / ' : '') + targetInput.value;
                    }
                    alreadyProcessedHiddenInputs.push(targetInputId); // 処理済みとしてマーク
                }
            }
        });

        // 空でなければリストに追加
        if (String(answerValue).trim()) {
          // HTMLエンティティをエスケープする簡単な処理 (簡易的)
          const escapedAnswer = String(answerValue).replace(/</g, "&lt;").replace(/>/g, "&gt;");
          // ただし、自分で挿入した <br> は許可する
          const finalAnswerHTML = escapedAnswer.replace(/&lt;br&gt;/g, '<br>');
          
          sectionSummaryHTML += `<li><strong>${questionTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</strong><br>${finalAnswerHTML}</li>`;
          questionFoundInSection = true;
        }
      });
      
      sectionSummaryHTML += '</ul>';
      // そのセクションに回答があればHTMLに追加
      if (questionFoundInSection) {
          summaryHTML += `<div class="summary-section">${sectionSummaryHTML}</div>`;
      }
    });
    
    // HTMLを挿入
    summaryContent.innerHTML = summaryHTML || '<p>回答がありません。</p>'; // 回答がない場合のメッセージ
  }

  // 印刷ボタンのイベントリスナー
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      generateSummary(); // ヒアリング結果を生成してから印刷
      window.print();
    });
  }

  // PDFダウンロードボタンのイベントリスナー
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      try {
        generateSummary(); // ヒアリング結果を生成してからPDF出力
        // html2canvas と jsPDF を使用してPDF生成
        const element = document.getElementById('section-7');
        
        // ライブラリが読み込まれているか確認
        if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
          console.log('PDF libraries not loaded. Loading...');
          // ライブラリがない場合は読み込む
          loadLibrariesAndGeneratePDF(element);
        } else {
          console.log('PDF libraries already loaded. Generating PDF...');
          // ライブラリがある場合はPDF生成
          generatePDF(element);
        }
      } catch (error) {
        console.error('Error handling download button click:', error);
        alert('PDF生成の準備中にエラーが発生しました。');
      }
    });
  }

  // PDFライブラリを動的に読み込む関数
  function loadLibrariesAndGeneratePDF(element) {
    const html2canvasUrl = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    const jspdfUrl = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    let loadedCount = 0;
    const totalLibs = 2;

    function checkAndGenerate() {
        loadedCount++;
        if (loadedCount === totalLibs) {
            console.log('Libraries loaded. Generating PDF...');
            generatePDF(element);
        }
    }

    // html2canvasを読み込む
    if (typeof html2canvas === 'undefined') {
        console.log('Loading html2canvas...');
        const html2canvasScript = document.createElement('script');
        html2canvasScript.src = html2canvasUrl;
        html2canvasScript.onload = checkAndGenerate;
        html2canvasScript.onerror = () => { console.error('Failed to load html2canvas'); checkAndGenerate(); }; // エラーでもカウントを進める
        document.head.appendChild(html2canvasScript);
    } else {
        console.log('html2canvas already loaded.');
        loadedCount++; 
    }
    
    // jsPDFを読み込む
    if (typeof jspdf === 'undefined') {
        console.log('Loading jsPDF...');
        const jsPDFScript = document.createElement('script');
        jsPDFScript.src = jspdfUrl;
        jsPDFScript.onload = checkAndGenerate;
        jsPDFScript.onerror = () => { console.error('Failed to load jsPDF'); checkAndGenerate(); }; // エラーでもカウントを進める
        document.head.appendChild(jsPDFScript);
    } else {
         console.log('jsPDF already loaded.');
        loadedCount++; 
    }
    // 両方のライブラリが読み込まれたか、またはタイムアウトしたら PDF 生成を試みる (onload 内で実行)
    if(loadedCount === totalLibs) {
       generatePDF(element); // 同期的に読み込み済みの場合
    }
  }

  // PDF生成関数 (jsPDF の名前空間を明示)
  function generatePDF(element) {
      if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
          console.error('PDF libraries are not available.');
          alert('PDF生成に必要なライブラリの読み込みに失敗しました。');
          return;
      }
      console.log('Starting PDF generation process...');
      
      try {
        // PDF生成前にナビゲーションボタンを一時的に非表示にする
        const navigationElements = element.querySelectorAll('.navigation, .top-navigation');
        navigationElements.forEach(nav => {
            nav.style.display = 'none';
        });
        
        html2canvas(element, {
          scale: 2, // 解像度
          useCORS: true, // CORS
          logging: true, // デバッグのためログを有効化
          windowWidth: element.scrollWidth, // 要素の全幅を使用
          windowHeight: element.scrollHeight // 要素の全高を使用
        }).then(canvas => {
          console.log('Canvas created successfully.');
          
          // PDF生成後、非表示にしたナビゲーションを元に戻す
          navigationElements.forEach(nav => {
              nav.style.display = '';
          });
          
          try {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = jspdf; // jsPDF オブジェクトを取得
            
            if (!jsPDF) {
              throw new Error('jsPDF object is not available');
            }
            
            const pdf = new jsPDF('p', 'mm', 'a4'); // A4縦
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // 安全なイメージプロパティの取得
            const pageMargin = 10; // 上下左右のマージン
            let imgWidth, imgHeight;
            
            try {
              const imgProps = pdf.getImageProperties(imgData);
              imgWidth = imgProps.width;
              imgHeight = imgProps.height;
            } catch (propError) {
              console.error('Error getting image properties:', propError);
              // フォールバック: キャンバスサイズを使用
              imgWidth = canvas.width;
              imgHeight = canvas.height;
            }
            
            // PDF幅からマージンを引いた描画可能幅に合わせる
            const usablePdfWidth = pdfWidth - (pageMargin * 2);
            const ratio = usablePdfWidth / imgWidth;
            const scaledImgHeight = imgHeight * ratio;
            
            let currentHeightPosition = 0;
            const usablePdfHeight = pdfHeight - (pageMargin * 2);

            // 画像をページごとに分割して追加
            let remainingImgHeight = scaledImgHeight;
            let currentImgY = 0;

            while (remainingImgHeight > 0) {
                const pageHeightToDraw = Math.min(remainingImgHeight, usablePdfHeight);
                // 対応する元画像の高さを計算
                const sourceHeight = pageHeightToDraw / ratio;

                // 新しいcanvasを作成して部分的に描画
                const segmentCanvas = document.createElement('canvas');
                segmentCanvas.width = imgWidth;
                segmentCanvas.height = sourceHeight;
                const segmentCtx = segmentCanvas.getContext('2d');
                
                // canvasから部分的に画像データをコピー
                segmentCtx.drawImage(canvas, 0, currentImgY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
                const segmentImgData = segmentCanvas.toDataURL('image/png');

                if (currentHeightPosition > 0) { // 最初のページ以外は改ページ
                    pdf.addPage();
                }

                pdf.addImage(segmentImgData, 'PNG', pageMargin, pageMargin, usablePdfWidth, pageHeightToDraw);
                
                remainingImgHeight -= pageHeightToDraw;
                currentImgY += sourceHeight;
                currentHeightPosition += usablePdfHeight; // 次の描画開始位置（実際には改ページされる）
            }

            pdf.save('ヒアリング結果.pdf');
            console.log('PDF saved successfully.');
          } catch (pdfError) {
            console.error('Error during PDF generation:', pdfError);
            alert('PDFの生成処理中にエラーが発生しました。詳細はコンソールを確認してください。');
            
            // エラーが発生した場合も非表示にしたナビゲーションを元に戻す
            navigationElements.forEach(nav => {
                nav.style.display = '';
            });
          }
        }).catch(canvasError => {
             console.error('Error during html2canvas processing:', canvasError);
             alert('HTMLからキャンバスへの変換中にエラーが発生しました。詳細はコンソールを確認してください。');
             
             // エラーが発生した場合も非表示にしたナビゲーションを元に戻す
             navigationElements.forEach(nav => {
                 nav.style.display = '';
             });
        });
      } catch (generalError) {
        console.error('General error in PDF generation process:', generalError);
        alert('PDFの生成準備中にエラーが発生しました。詳細はコンソールを確認してください。');
      }
  }

  // 初期表示時のプログレスバー設定と最初のセクション表示
  updateProgress(0);
  // showSection(0); // 最初にセクション0を表示 - ウェルカムページを表示するためコメントアウト
});
